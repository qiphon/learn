import { atom } from 'recoil';
import { initContact } from '@web/models/contactObject';

export const contactState = atom({
  key: 'ContactState',
  default: initContact(),
});
