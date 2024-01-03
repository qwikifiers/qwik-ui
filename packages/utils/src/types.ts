import { type ClassList } from '@builder.io/qwik';

export type OmitSignalClass<T> = Omit<T, 'class'> & { class?: ClassList };
