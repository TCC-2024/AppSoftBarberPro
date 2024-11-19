import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// Componente InfoBox para modularizar as caixas de informações
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

  const barbeariaInfo = {
    nome: "Nome da Barbearia",
    descricao: "A melhor barbearia da cidade, com serviços exclusivos para você.",
    fotoPerfil: 'https://link-da-imagem-do-perfil.com', // Link da foto do perfil
  };

  // Função para abrir o modal com informações específicas
  const handleModalOpen = (content) => {
    setModalContent(content);
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
            source={{ uri: barbeariaInfo.fotoPerfil }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraIconContainer}>
            <Ionicons name="camera" size={35} color="#000" /> {/* Ícone centralizado com o tamanho adequado */}
          </TouchableOpacity>
        </View>
        <Text style={styles.nome}>{barbeariaInfo.nome}</Text>
        {/* Descrição */}
        <Text style={styles.descricao}>{barbeariaInfo.descricao}</Text>
      </View>

      {/* Caixas de Informações */}
      <View style={styles.infoContainer}>
        <InfoBox
          icon={<Ionicons name="location-outline" size={24} color="#D0AC4B" />}
          label="Localização"
          onPress={() => handleModalOpen('Informações sobre a Localização')}
        />
        <InfoBox
          icon={<Ionicons name="star-outline" size={24} color="#D0AC4B" />}
          label="Avaliação"
          onPress={() => handleModalOpen('Informações sobre Avaliação')}
        />
        <InfoBox
          icon={<Ionicons name="time-outline" size={24} color="#D0AC4B" />}
          label="Horário"
          onPress={() => handleModalOpen('Informações sobre o Horário de Funcionamento')}
        />
        <InfoBox
          icon={<FontAwesome5 name="cut" size={24} color="#D0AC4B" />}
          label="Serviços"
          onPress={() => handleModalOpen('Lista de Serviços oferecidos pela barbearia')}
        />
        {/* Nova categoria: Fotos */}
        <InfoBox
          icon={<Ionicons name="image-outline" size={24} color="#D0AC4B" />}
          label="Fotos"
          onPress={() => handleModalOpen('Galeria de fotos da barbearia')}
        />
      </View>

      {/* Botão de Agendamento */}
      <TouchableOpacity
        style={styles.botaoAgendar}
        onPress={() => navigation.navigate('AgendarHorario')}
      >
        <Text style={styles.botaoTexto}>Agendar um Horário</Text>
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
    backgroundColor: '#D0AC4B', // Dourado para o botão
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