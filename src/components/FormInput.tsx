interface FormInputProps {
  labelContainerClasses?: string;
  inputContainerClasses?: string;
  htmlFor?: string;
  title?: string;
  id?: string;
  name?: string;
  type?: string;
  inputRef?: any;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  required?: boolean;
  className?: string;
  extras?: any;
  labelClasses?: string;
}

const FormInput = (props: FormInputProps) => {
  return (
    <>
      <div className={props.labelContainerClasses}>
        {props.title && (
          <label htmlFor={props.htmlFor} className={props.labelClasses}>
            {props.title}
            {props.required && <span className="text-red-600 text-lg">*</span>}
          </label>
        )}
        {props.extras}
      </div>
      <div className={props.inputContainerClasses}>
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          ref={props.inputRef}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          required={props.required}
          className={props.className}
        />
      </div>
    </>
  );
};

export default FormInput;
