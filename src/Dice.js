export default function Dice(props) {
    const styles = {
        backgroundColor : props.isHold ? "#55AA55" : "white"
    }
    return (
        <div 
            className='die' 
            style={styles}
            onClick={props.holdDice}
        >
            <p className='die--number'>{props.value}</p>
        </div>
    )
}