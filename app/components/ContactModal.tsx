import { useState, useRef } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Cross2Icon, ChatBubbleIcon } from '@radix-ui/react-icons';
import { useUser } from '@clerk/nextjs';
// import { useFormik } from 'formik';
// import { Formik, Field, Form, FormikHelpers } from 'formik';
import emailjs from '@emailjs/browser';

// TODO: create feedback form
// hook up email js
// LATER add yup for validation object
interface Values {
  type: string;
  message: string;
}
// EMAILJS_PUBLIC_KEY='_4nI3pdUKVnJRed_3'
const emailjsPublicKey = '_4nI3pdUKVnJRed_3'
const ContactModal = () => {
  const form = useRef(null);
  const { user, isSignedIn } = useUser();
  console.log("user:", user)

  // drop down for enquiry type
  // message box
  // email sent as user's email - already signed in
  // console.log("emailjsPublicKey:", emailjsPublicKey)
  const categories = [
    {
    'name':'Help', 
    'emoji': '🙋‍♂️', 
    'description': "Please describe how we can help you"
  },
    {
    'name':'Issue', 
    'emoji': '🐛', 
    'description':'Please describe any issues with the app'
  },
    {
    'name':'New Feature', 
    'emoji': '🆕',
    'description':'Please describe any new features you would like to see'
  },
  ]
  const initial = {
    type: categories[0]["name"], // to be from dropdown
    message: '',
  }
  
  const categoryDropdownContent = categories.map((item) => {
    return <option key={item.name} value={item.name}>{item.name} {item.emoji}</option>
  })
  const [formState, setFormState] = useState(initial)
  const [currentType, setCurrentType] = useState(categories[0])

const categoryDropdown = (
  <label className="min-w-full flex items-center justify-center">
      <select
      onChange={handleInput}
      name='type'
      value={formState['type'] || ""}
      className="w-9/12 text-center border p-2 mx-2 my-2 text-black"
      >
        { categoryDropdownContent }
      </select>
    </label>
)

function handleInput(event) {
  console.log("event:", event.target.name)
  if (event.target.name === 'type') {
    let cat = categories.filter((item) => item.name === event.target.value)[0]
    setCurrentType(cat)
    setFormState({
      type: event.target.value,
      message: formState['message']
  })
  } else {
    setFormState({
        type: formState['type'],
        message: event.target.value
    })

  }
}

function sendEmail(event) {
  event.preventDefault();
  // `${formState['type']}: ${formState['message']}`
  console.log("formState:", form.current)
  emailjs.sendForm('service_0qu6qfq', 'template_w31b35w', form.current, emailjsPublicKey)
    .then((result) => {
        console.log('result: ', result.text, result);
        setFormState(initial)
    }, (error) => {
        console.log(error.text);
    });
}

  return (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button className="rounded-full h-9 w-9 inline-flex items-center justify-center text-orange-900 bg-white shadow-md" aria-label="Update dimensions">
        <ChatBubbleIcon />
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className="rounded-md p-5 w-[300px] bg-white shadow-lg transition-all duration-400 ease-in-out will-change-[transform,opacity]" sideOffset={5}>
        <form className="flex flex-col space-y-2.5" ref={form}>
          <p className="m-0 text-orange-900 text-sm leading-[19px] font-semibold mb-2.5">
            Talk to us
          </p>
          {categoryDropdown}
          <label
            className="text-xs text-gray-900 mb-2.5"
          >
            {currentType['description']}
          </label>
          <fieldset className="flex space-x-5 items-center">
            <textarea 
            className="pt-2 w-full row-span-4 inline-flex items-center justify-center flex-1 rounded-md px-2.5 text-xs leading-none text-black border border-orange-700 h-24" 
            id="width" 
            defaultValue=""
            name="message"
            onChange={handleInput} 
            />
          </fieldset>          
        <button
          className='px-4 py-2 bg-[#949797] text-black hover:text-[#E9DC88] rounded-lg' 
          onClick={sendEmail}
        >
          Submit
        </button>
        <input type="hidden" name="from_email" value={user? user.primaryEmailAddress.emailAddress: null} />
        </form>
        <Popover.Close className="font-inherit rounded-full h-6 w-6 inline-flex items-center justify-center text-violet-900 absolute top-1 right-1" aria-label="Close">
          <Cross2Icon />
        </Popover.Close>
        <Popover.Arrow className="fill-current text-white" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>

  )
}
;

export default ContactModal;