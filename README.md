# React - Translatable Input Component
A React input component that manages multiple languages.

* The values object

The most important prop to be passed is the values object, which must be a plain JS Object in the form { lang: langValue }. For example:

```
values = {
  'az': 'Az input',
  'en': 'English input',
  'ru': 'Russian input'
};
```
<p>
<img src="data:image/png;base64,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" alt="input image"/>
  </p>

* Using 

```
<TranslatableInputComponent
    type={inputTypes.text}
    label="Input label"
    onChangeValue={(val) => handleChange('inputName', { customValue: val })}
    value={inputName}
/>
```

Formik and Memoized version: 

```
// input type text
<MemoizedTranslatableInput
    type={inputTypes.text}
    onChangeValue={(val) => formik.setFieldValue('title', val)}
    value={formik.values.title}
    customStyle={{
        width: '100%',
        flex: 1,
        marginTop: 0,
        marginBottom: 8
    }}
/>

// input type textarea
<MemoizedTranslatableInput
    type={inputTypes.textarea}
    onChangeValue={(val) => formik.setFieldValue('description', val)}
    value={formik.values.description}
    textareaSelectionStyle={{
        position: 'absolute',
        fontSize: 14,
        fontWeight: 500,
        left: 5,
        top: 5,
        zIndex: 3,
        cursor: 'pointer',
        padding: 5
    }}
    textareaContainerStyle={{
        position: 'relative',
        marginTop: 0
    }}
/>
```

* Currently supported types (Can be increased)

```
export const inputTypes = {
    text: 'text',
    textarea: 'textarea'
}
```

* PropTypes

```
type: PropTypes.string.isRequired,
placeholder: PropTypes.string,
label: PropTypes.string,
value: PropTypes.any.isRequired,
onChangeValue: PropTypes.func,
customStyle: PropTypes.object,
fieldId: PropTypes.string,
disabled: PropTypes.bool,
textareaSelectionStyle: PropTypes.object,
textareaContainerStyle: PropTypes.object
```

* Dependencies

```
react
prop-types
@material-ui/core
react-redux
```
