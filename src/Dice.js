export default function Dice(props) {
    return (
        <div className='die die__selected'>
            <p className='die--number'>{props.value}</p>
        </div>
    )
}