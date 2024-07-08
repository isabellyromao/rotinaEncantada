import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginTop: 10 
    },

    containerInicial: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        gap: 50
      },

      botaoPrincipal: {
        alignItems: 'center',
        justifyContent: "center",
      },
    
      botaoSecundario:{
        alignItems:"center",
        justifyContent: "center",
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
        paddingBottom: 50
      },

      textoExplicativo:{
        alignItems: "center",
        gap: 18,
      },

      botoesLadoaLado:{
        flexDirection:"row",
        margin:16, 
        marginTop: -10,
        gap: 30
      },

      subtitulo:{
        textAlign: "center"
      }
});

export default styles;
