export type TSubjects =
  | 'banglaLiterature'
  | 'banglaGrammar'
  | 'englishLiterature'
  | 'englishGrammar'
  | 'gkBangladesh'
  | 'gkInternational'
  | 'geographyEnvironment'
  | 'generalScience'
  | 'computerICT'
  | 'mathematics'
  | 'mentalAbility'
  | 'ethicsValuesGoodGovernance';

import { Model } from 'mongoose';

export type TSubjectNames = {
  subjectName: TSubjects;
  isDeleted: boolean;
  createdBy: string;
};

export interface SubjectNameModel extends Model<TSubjectNames> {
  isSubjectNameExists(subjectName: string): Promise<TSubjectNames | null>;
}
