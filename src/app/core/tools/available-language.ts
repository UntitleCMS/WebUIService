export interface Language {
  id: string;
  name: string;
}

export interface LanguageLogo {
  id: string;
  logo: string;
}

export const availableLanguages: Language[] = [
  {
    id: 'c',
    name: 'C',
  },
  {
    id: 'java',
    name: 'Java',
  },
  {
    id: 'python',
    name: 'Python',
  },
];