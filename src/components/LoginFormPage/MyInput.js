import {
  FormErrorMessage,
  FormHelperText,
  Input,
  Spacer,
} from "@chakra-ui/react";

const MyInput = ({ name, state, setState, text, handleSubmit, errors }) => {
  //
  let ownerrors = errors.filter((arr) => {
    return arr.includes(name);
  });

  return (
    <>
      <label
        style={{
          fontFamily: "Circular",
          fontWeight: "700",
          fontSize: "15px",
        }}
        htmlFor={name}
      >
        {text}
      </label>
      <Input
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            handleSubmit(e);
          }
        }}
        borderColor="black"
        borderRadius="4px"
        placeholder={
          name === "currentPassword"
            ? "Enter your password again."
            : `Enter your ${name}.`
        }
        focusBorderColor="black"
        // isInvalid
        errorBorderColor={ownerrors.length > 0 ? "red.300" : "black"}
        sx={{
          border: "1px solid black",
          lineHeight: "1.5",
          fontSize: "1rem",
          height: "50px",
          marginTop: "5px",
          //   marginBottom: "20px",
        }}
        type={name}
        id={name}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      {ownerrors.length > 0 ? (
        <FormErrorMessage>
          {name === "currentPassword"
            ? "Password doesn't match"
            : ownerrors[0][0].toUpperCase() + ownerrors[0].slice(1)}
        </FormErrorMessage>
      ) : null}

      <div style={{ marginBottom: "20px" }}></div>
    </>
  );
};
export default MyInput;
