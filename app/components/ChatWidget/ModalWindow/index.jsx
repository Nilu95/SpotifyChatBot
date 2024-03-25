// importing external style
import { styles } from "./../styles";
//for displaying the model view/Window
function ModalWindow(props) {
   // returning display
   return (
      <div
         style={{
            ...styles.modalWindow,
            ...{ opacity: props.visible ? "1" : "0" },
         }}
      >
         <label htmlFor="inputField">Input:</label>
         <input type="text" id="inputField" />
      </div>
   );
}
export default ModalWindow;
