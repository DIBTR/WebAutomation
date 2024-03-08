import CredentialItem from "@models/login/credentialItem";

export default interface Credential {
  standard_user: CredentialItem;
  error_user: CredentialItem;
  invalid_user : CredentialItem;
  locked_out_user : CredentialItem;
  enrolled_user : CredentialItem
}
