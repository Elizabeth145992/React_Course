import InputLabel from './InputLabel.jsx';
import { INPUTCONFIG } from '../util/config.js';

export default function UserInput({ onChangeInput, userInput }) {
    return (
        <section id="user-input">
                {INPUTCONFIG.map((item, index) => (
                <InputLabel 
                    key={item.id} 
                    title={item.title} 
                    identifier={item.id} 
                    valueInput={userInput[item.id]} 
                    handleChange={onChangeInput} 
                />
                ))}
        </section>
    );
}