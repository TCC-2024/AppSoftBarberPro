import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../../config/firebaseConfig';

// Componente InfoBox para modularizar as caixas de informações
const InfoBox = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.infoBox} onPress={onPress}>
    {icon}
    <Text style={styles.infoText}>{label}</Text>
    <Ionicons name="chevron-forward-outline" size={24} color="#D0AC4B" style={styles.arrowIcon} />
  </TouchableOpacity>
);

export default function Perfil({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const [nomeUser, setNomeUser] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [image, setImage] = useState('');
  const [servicos, setServicos] = useState([]);
  const [enderecos, setEnderecos] = useState([]); // Inicializamos o estado
  const [horarios, setHorarios] = useState([]); // Estado para armazenar os horários

  // Função de logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Desconecta o usuário
      console.log("Usuário deslogado com sucesso!");
      navigation.replace("Login"); // Redireciona para a tela de login
    } catch (error) {
      console.error("Erro ao deslogar: ", error);
    }
  };

  // Puxar dados do Firestore quando o usuário estiver autenticado
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "CadastroBarbearia", user.uid);
        const unsubscribe = onSnapshot(userDoc, (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setNomeUser(userData.nomebarbeariacadastro);
            setEmailUser(userData.sobre);
            setImage(userData.imageURL || 'https://default-profile-image.com'); // Use uma imagem padrão se não houver URL
          } else {
            console.log("No such document!");
          }
        });
        return () => unsubscribe();
      }
    };

    fetchUserData();
  }, []);

  // Puxar endereços, horários, avaliações e serviços do Firestore
  useEffect(() => {
    const fetchEnderecos = async () => {
      const user = auth.currentUser;

      if (user) {
        const q = query(
          collection(db, 'CadastroEndereço'),
          where('userId', '==', user.uid) // Filtrar pelo ID do usuário logado
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const enderecosData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setEnderecos(enderecosData); // Atualizar estado com endereços filtrados
        });

        return () => unsubscribe();
      }
    };

    const fetchHorarios = async () => {
      const user = auth.currentUser;

      if (user) {
        const q = query(
          collection(db, 'CadastroHorarios'), // Nome da coleção no Firestore
          where('userId', '==', user.uid) // Filtrar pelos horários do usuário logado
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const horariosData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setHorarios(horariosData); // Atualizar o estado com os horários
        });

        return () => unsubscribe();
      }
    };

    const fetchServicos = async () => {
      const user = auth.currentUser;

      if (user) {
        const q = query(
          collection(db, 'CadastroServiços'),
          where('userId', '==', user.uid)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          if (!querySnapshot.empty) {
            const servicosData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("Serviços encontrados:", servicosData); // Log dos serviços encontrados
            setServicos(servicosData);
          } else {
            console.log("Nenhum serviço encontrado.");
            setServicos([]); // Atualizar para vazio caso não encontre dados
          }
        });

        return () => unsubscribe();
      }
    };

    fetchEnderecos();
    fetchHorarios();
    fetchServicos();
  }, []);

  // Função de abertura de modal
  const handleModalOpen = (content) => {
    if (content === 'Serviços') {
      if (Array.isArray(servicos) && servicos.length > 0) {
        // Mapear os serviços e formatar a exibição
        const servicosTexto = servicos.map((servico, index) => {
          return `Serviço: ${servico.servico}\nDuração: ${servico.duracao}\nPreço: R$ ${servico.valor}\n\n`;
        }).join('');
        setModalContent(servicosTexto);
      } else {
        setModalContent('Nenhum serviço cadastrado.');
      }
    } else if (content === 'Horários') {
      setModalContent(
        horarios.length > 0
          ? horarios.map((horario) => `${horario.dia}: ${horario.horaInicio} - ${horario.horaFim}`).join('\n')
          : 'Nenhum horário cadastrado.'
      );
    } else {
      setModalContent(content);
    }
    setModalVisible(true);
  };




  return (
    <ScrollView style={styles.container}>
      {/* Header com seta para voltar e Foto de Perfil */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarButton}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraIconContainer}>
            <Ionicons name="camera" size={35} color="#000" /> {/* Ícone centralizado com o tamanho adequado */}
          </TouchableOpacity>
        </View>
        <Text style={styles.nome}>{nomeUser || 'Nome da Barbearia'}</Text>
        {/* Descrição */}
        <Text style={styles.descricao}>{emailUser || 'Descrição do usuário'}</Text>
      </View>

      {/* Caixas de Informações */}
      <View style={styles.infoContainer}>
        {enderecos.length > 0 ? (
          enderecos.map((endereco) => (
            <View key={endereco.id} style={styles.infoBox}>
              <Ionicons name="location-outline" size={24} color="#D0AC4B" />
              <Text style={styles.infoText}>
                {endereco.rua}, {endereco.cidade}, {endereco.estado}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.descricao}>Nenhum endereço encontrado para esta barbearia.</Text>
        )}
        <InfoBox
          icon={<Ionicons name="time-outline" size={24} color="#D0AC4B" />}
          label="Horário"
          onPress={() => handleModalOpen('Horários')}
        />

        <InfoBox
          icon={<FontAwesome5 name="cut" size={24} color="#D0AC4B" />}
          label="Serviços"
          onPress={() => handleModalOpen('Serviços')}
        />

      </View>

      {/* Botão de Logout */}
      <TouchableOpacity
        style={styles.botaoAgendar}
        onPress={handleLogout}
      >
        <Text style={styles.botaoTexto}>SAIR</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalContent}</Text>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 15,
  },
  voltarButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex: 1,
  },
  profileImageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#D0AC4B', // Dourado para a borda da imagem de perfil
  },
  cameraIconContainer: {
    position: 'absolute',
    top: '40%',  // Centraliza verticalmente sobre a imagem
    left: '40%', // Centraliza horizontalmente sobre a imagem
    transform: [{ translateX: -18 }, { translateY: -18 }], // Ajusta para o centro exato
    backgroundColor: '#FFF',
    padding: 12,  // Ajusta o tamanho do círculo
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  descricao: {
    fontSize: 16,
    color: '#000',  // Cor da descrição alterada para preto
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    marginLeft: 15,
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  botaoAgendar: {
    backgroundColor: 'red', // Dourado para o botão
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#FFF', // Texto branco para o botão
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#D0AC4B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});