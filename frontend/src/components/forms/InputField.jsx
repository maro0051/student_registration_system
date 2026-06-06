function InputField({

    label,

    value,

    onChange,

    type = "text"

}) {

    return (

        <div className="mb-3">

            <label
                className="form-label"
            >

                {label}

            </label>

            <input

                type={type}

                className="form-control"

                value={value}

                onChange={onChange}

            />

        </div>

    );

}

export default InputField;