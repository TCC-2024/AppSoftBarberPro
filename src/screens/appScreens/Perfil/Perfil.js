import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { auth, db } from '../../../config/firebaseConfig';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';

const InfoBox = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.infoBox} onPress={onPress}>
    {icon}
    <Text style={styles.infoText}>{label}</Text>
    <Ionicons name="chevron-forward-outline" size={24} color="#D0AC4B" style={styles.arrowIcon} />
  </TouchableOpacity>
);

export default function BarbeariaPerfil({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [userId, setUserId] = useState(null);

  const [barbeariaInfo, setBarbeariaInfo] = useState({
    nome: '',
    descricao: '',
    fotoPerfil: ''
  });

  useEffect(() => {
    const user = auth.currentUser; // Autenticação atual
    if (user) {
      setUserId(user.uid); // Atribui o userId após o login
    }
  }, []);

  useEffect(() => {
    if (userId) {
      // Buscar avaliações
      const unsubscribeAvaliacoes = onSnapshot(
        query(collection(db, 'Avaliacoes'), where('barbeariaId', '==', userId)),
        (querySnapshot) => {
          const avaliacoesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAvaliacoes(avaliacoesData);
        }
      );

      // Buscar endereços
      const unsubscribeEnderecos = onSnapshot(
        query(collection(db, 'CadastroEndereço'), where('barbeariaId', '==', userId)),
        (querySnapshot) => {
          const enderecosData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setEnderecos(enderecosData);
        }
      );

      // Buscar serviços
      const unsubscribeServicos = onSnapshot(
        query(collection(db, 'CadastroServiços'), where('barbeariaId', '==', userId)),
        (querySnapshot) => {
          const servicosData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setServicos(servicosData);
        }
      );

      // Buscar horários
      const unsubscribeHorarios = onSnapshot(
        query(collection(db, 'CadastroHorarios'), where('barbeariaId', '==', userId)),
        (querySnapshot) => {
          const horariosData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setHorarios(horariosData);
        }
      );

      return () => {
        unsubscribeAvaliacoes();
        unsubscribeEnderecos();
        unsubscribeServicos();
        unsubscribeHorarios();
      };
    }
  }, [userId]);

  useEffect(() => {
    const fetchBarbeariaData = async () => {
      const user = auth.currentUser; // Autenticação atual
      if (user) {
        const barbeariaDoc = doc(db, "CadastroBarbearia", user.uid); // Substitua por sua coleção e estrutura de documentos
        const unsubscribe = onSnapshot(barbeariaDoc, (doc) => {
          if (doc.exists()) {
            const barbeariaData = doc.data();
            setBarbeariaInfo({
              nome: barbeariaData.nomebarbeariacadastro || 'Nome não disponível',
              descricao: barbeariaData.sobre || 'Descrição não disponível',
              fotoPerfil: barbeariaData.fotoPerfil || 'https://via.placeholder.com/120',
            });
          } else {
            console.log("No such document!");
          }
        });
        return () => unsubscribe();
      }
    };

    fetchBarbeariaData();
  }, []);

  const handleModalOpen = (content) => {
    setModalContent(content);  // Define o tipo de conteúdo do modal
    setModalVisible(true);     // Torna o modal visível
  };

  const handleModalClose = () => {
    setModalVisible(false);    // Fecha o modal
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarButton}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: barbeariaInfo.fotoPerfil }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraIconContainer}>
            <Ionicons name="camera" size={35} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.nome}>{barbeariaInfo.nome}</Text>
        <Text style={styles.descricao}>{barbeariaInfo.descricao}</Text>
      </View>

      <View style={styles.infoContainer}>
        <InfoBox
          icon={<Ionicons name="location-outline" size={24} color="#D0AC4B" />}
          label="Localização"
          onPress={() => handleModalOpen('Localização')}
        />
        <InfoBox
          icon={<Ionicons name="star-outline" size={24} color="#D0AC4B" />}
          label="Avaliação"
          onPress={() => handleModalOpen('Avaliações')}
        />
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
        <InfoBox
          icon={<Ionicons name="image-outline" size={24} color="#D0AC4B" />}
          label="Fotos"
          onPress={() => handleModalOpen('Fotos')}
        />
      </View>

      <TouchableOpacity
        style={styles.botaoAgendar}
        onPress={() => navigation.navigate('AgendarHorario')}
      >
        <Text style={styles.botaoTexto}>SAIR</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalContent}</Text>
            <ScrollView>
              {modalContent === 'Avaliações' && avaliacoes.length > 0 ? (
                avaliacoes.map((avaliacao) => (
                  <View key={avaliacao.id} style={styles.modalItem}>
                    <Text>{avaliacao.avaliacao}</Text>
                    <Text>{avaliacao.comentario}</Text>
                  </View>
                ))
              ) : modalContent === 'Localização' && enderecos.length > 0 ? (
                enderecos.map((endereco) => (
                  <View key={endereco.id} style={styles.modalItem}>
                    <Text>{endereco.rua}</Text>
                  </View>
                ))
              ) : modalContent === 'Serviços' && servicos.length > 0 ? (
                servicos.map((servico) => (
                  <View key={servico.id} style={styles.modalItem}>
                    <Text>{servico.servico}</Text>
                  </View>
                ))
              ) : modalContent === 'Horários' && horarios.length > 0 ? (
                horarios.map((horario) => (
                  <View key={horario.id} style={styles.modalItem}>
                    <Text>{horario.horario}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noDataText}>Sem dados disponíveis.</Text>
              )}
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={handleModalClose}>
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
    top: '30%',  // Centraliza verticalmente sobre a imagem
    left: '50%', // Centraliza horizontalmente sobre a imagem
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