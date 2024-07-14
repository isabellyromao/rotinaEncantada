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
        justifyContent: "space-between",
        gap: 50,
        paddingBottom: 50
      },

      renderBotaoSemBorda:{
        width: 162, 
        height:49, 
      },

      renderBotaoComBorda:{
        height:49, 
        borderColor:"#300030", 
        borderWidth: 1, 
        borderRadius: 8,
        justifyContent: "center"
      },

      renderTexto:{
        color: "#300030", 
        fontFamily: "NotoSans_600SemiBold", 
        fontSize:18,
        textAlign: "center"
      }


   
});

export default styles;
