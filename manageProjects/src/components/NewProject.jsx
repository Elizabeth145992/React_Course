import Input from "./Input";
import Modal from "./Modal";
import { useRef } from "react";

export default function NewProject({onAdd, onCancel}) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const modalRef = useRef();

  function handleSave() {
    const titleInput = title.current.value;
    const descriptionInput = description.current.value;
    const dueDateInput = dueDate.current.value;

    if(titleInput.trim().length === 0 || descriptionInput.trim().length === 0 || dueDate.trim().length === 0){
        modalRef.current.open();
        return;
    }

    onAdd({
      title: titleInput,
      description: descriptionInput,
      dueDate: dueDateInput,
    });
  }

  return (
    <>
    <Modal ref={modalRef} buttonCaption={"Close"}>
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid input</h2>
        <p className="text-stone-600 mb-4">Oops... looks like you forgot to enter a value.</p>
        <p className="text-stone-600 mb-4">Please make sure ypu provide a valid input for every input field.</p>
    </Modal>
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
            Cancel
          </button>
        </li>
        <li>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input type='text' ref={title} label={"Title"} />
        <Input ref={description} label={"Description"} textArea />
        <Input type='date' ref={dueDate} label={"Due Date"} />
      </div>
    </div>
    </>
    
  );
}
