import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
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
        flexDirection: "row",
        gap: 25,
        paddingBottom: 50,
        justifyContent: "center"
      },

      renderBotao:{
        height:49,
        borderColor:"#300030", 
        borderWidth: 1, 
        borderRadius: 8,
        justifyContent: "center",
        width: 322,
        alignSelf: "center"

      },

      renderTexto:{
        color: "#300030", 
        fontSize:18,
        textAlign: "center"
        
      }
   
});

export default styles;
