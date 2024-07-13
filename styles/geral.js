import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },

    containerInicial: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        gap: 50
      },
    
      botoes:{
        gap: 25
      },
    
      logo:{
        alignItems: "center",
        justifyContent: "center",
      },

      textoFooter:{
        alignItems:"center",
        textAlign:"center",
        paddingBottom: 50,
        color: "#300030", 
        fontSize: 16
      },

      botoesLadoaLado:{
        flexDirection:"row",
        gap: 30,
        paddingBottom:50
      },

   
});

export default styles;
