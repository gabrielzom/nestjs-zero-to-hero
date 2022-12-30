export class UserExceptionMessage {
  private readonly EMAIL_NOT_VALID = 'The informed e-mail is invalid';
  private readonly EMAIL_ALREADY_IN_USE =
    'User with this e-mail already exists';
  private readonly PASSWORDS_DONT_MATCH = 'The passwords not equals';
  private readonly ERROR_TO_CREATE_USER =
    'An error occurred where try recovery user created';
  private readonly USER_DONT_EXIST = 'This user are not exists';
  private readonly INCORRET_PASSWORD = 'The passoword informer ais incorrect';
  private readonly ERROR_TO_GET_USERS =
    'An error occurred where try find the users';
  private readonly ERROR_TO_GET_USER = 'An error occurred where try find user';
  private readonly ERROR_TO_LOGIN_USER =
    'An error occurred where try make login user';
  private readonly ERROR_TO_UPDATE_USER_INFO =
    'An error occurred where try update the user info';
  private readonly ERROR_TO_DELETE_USER =
    'An error occurred where try delete a register of user';

  get(messageName: string, exception?: any): string {
    if (!!exception) {
      return this[messageName] + ' : ' + exception.message;
    }
    return this[messageName] + '.';
  }
}
