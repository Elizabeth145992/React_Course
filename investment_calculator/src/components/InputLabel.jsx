export default function InputLabel({ title, identifier, valueInput, handleChange }) {
    return (
        <p>
            <label>{title}</label>
            <input 
                type="number" 
                value={valueInput} 
                required 
                onChange={(e)=>handleChange(identifier, e.target.value)}
            />
        </p>
    );
}