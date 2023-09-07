interface DataInputProps {
  htmlFor: string;
  label: string;
  labelClasses: string;
  containerClasses: string;
  inputContainerClasses: string;
  inputSpanClasses: string;
  type: string;
  name: string;
  onChange: any;
  id: string;
  value: string;
  inputClasses: string;
  placeholder: string;
  inputSpan: string;
}

const DataInput = (props: DataInputProps) => {
  return (
    <div className={props.containerClasses}>
      <label htmlFor={props.htmlFor} className={props.labelClasses}>
        {props.label}
      </label>
      <div className="mt-2">
        <div className={props.inputContainerClasses}>
          <span className={props.inputSpanClasses}>{props.inputSpan}</span>
          <input
            type={props.type}
            name={props.name}
            onChange={props.onChange}
            id={props.id}
            value={props.value}
            className={props.inputClasses}
            placeholder={props.placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default DataInput;
