import CredentialItem from './credentialItem';

export default interface Credential {
  standard_user: CredentialItem;
  error_user: CredentialItem;
}
