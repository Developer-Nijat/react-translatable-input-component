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
disabled: PropTypes.bool
```

* Dependencies

```
react
prop-types
@material-ui/core
react-redux
```
