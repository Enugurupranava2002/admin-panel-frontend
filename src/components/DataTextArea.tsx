interface DataTextAreaProps {
  htmlFor: string;
  label: string;
  labelClasses: string;
  containerClasses: string;
  name: string;
  onChange: any;
  id: string;
  value: string;
  textAreaClasses: string;
  rows: number;
  extras: any;
}

const DataTextArea = (props: DataTextAreaProps) => {
  return (
    <div className={props.containerClasses}>
      <label htmlFor={props.htmlFor} className={props.labelClasses}>
        {props.label}
      </label>
      <div className="mt-2">
        <textarea
          id={props.id}
          name={props.name}
          rows={props.rows}
          onChange={props.onChange}
          value={props.value}
          className={props.textAreaClasses}
        />
      </div>
      {props.extras}
    </div>
  );
};

export default DataTextArea;
