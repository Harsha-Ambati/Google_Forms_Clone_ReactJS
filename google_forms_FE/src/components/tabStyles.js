import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    background: "lightblue",
    border: 1,
    borderRadius: 1,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'black',
    height: 48,
    padding: '10 30px',
  },

  tab:{
    color:"black",
    height:15,
    fontFamily: 'Verdana',
  },
  tabs:{
      height:10    
  }
});

export { useStyle };