import { useState } from 'react'

export default function Form(props: { setLanguages: (arg0: string[]) => void; }) {
    const [selected, setSelected] = useState<string[]>(["English", "Spanish"]);

    const handleChange = (index: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
        const languageArr: string[] = [...selected];
        languageArr[index] = event.target.value;
        setSelected(languageArr);
    }
    return (
        <>
            <form>
                <label htmlFor="languageFrom">From:</label>
                <select id="languageFrom" name="languageFrom" defaultValue="English" onChange={handleChange(0)}>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Italian">Italian</option>
                </select>
                <label htmlFor="languageTo">To:</label>
                <select id="languageTo" name="languageTo" defaultValue="Spanish" onChange={handleChange(1)}>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Italian">Italian</option>
                </select>
            </form>
            <button onClick={() => props.setLanguages}>Save</button>
        </>
    )
}