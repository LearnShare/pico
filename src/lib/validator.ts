const EMAIL_REG = /^[\w\-.]+@[\w\-.]+\.[\w]+$/;

export function testEmail(email: string) {
  return EMAIL_REG.test(email);
}
