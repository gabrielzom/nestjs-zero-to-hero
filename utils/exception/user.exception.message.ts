export class UserExceptionMessage {
  private readonly INVALID_EMAIL = 'The informed e-mail is invalid';
  private readonly USER_EXIST = 'User with this e-mail already exists';
  private readonly PASS_DONT_MATCH = 'The passwords not equals';
  private readonly ERROR_CREATE_USER =
    'An error occurred where try recovery user created';
  private readonly USER_DONT_EXIST = 'This user are not exists';
  private readonly INCORRET_PASS = 'The passoword informed is incorrect';
  private readonly ERROR_GET_USERS =
    'An error occurred where try find the users';
  private readonly ERROR_GET_USER = 'An error occurred where try find user';
  private readonly ERROR_LOGIN_USER =
    'An error occurred where try make login user';
  private readonly ERROR_UPDATE_USER =
    'An error occurred where try update the user info';
  private readonly ERROR_DELETE_USER =
    'An error occurred where try delete a register of user';

  get(messageName: string, exception?: any) {
    if (this[messageName]) {
      if (!!exception) {
        return this[messageName].concat(' : ', exception.message);
      }
      return this[messageName].concat('.');
    }
    return null;
  }
}
