# React Native Translatable Input Component
A React Native input component that manages multiple languages.

* The values object

The most important prop to be passed is the values object, which must be a plain JS Object in the form { lang: langValue }. For example:

```
values = {
  'az': 'Az input',
  'en': 'English input',
  'ru': 'Russian input'
};
```

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
