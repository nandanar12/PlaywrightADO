import { RegisterFormDTO } from '../models/register-form.dto';

export const registerUsers: { [key: string]: RegisterFormDTO } = {
    // Valid user data
    validUser: {
        firstName: 'Ram',
        lastName: 'Ganesan',
        phoneNumber: '+64200200200',
        country: 'Afghanistan',
        emailAddress: 'myemail@email.co.nz',
        password: 'passw0rd123',
    },
    // Invalid user data - without email address
    noEmail: {
        firstName: 'Jey',
        lastName: 'Alag',
        phoneNumber: '64200200202',
        country: 'Belarus',
        emailAddress: '',
        password: 'passw0rd225',
    },
    // Invalid user data - without password
    noPassword: {
        firstName: 'Quinton',
        lastName: 'Gibson',
        phoneNumber: '64200200202',
        country: 'Sweden',
        emailAddress: 'myemail@email.co.nz',
        password: '',
    },
};
