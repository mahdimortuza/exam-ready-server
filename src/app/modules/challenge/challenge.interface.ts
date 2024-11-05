export type TChallenge = {
  challengeTitle: string;
  challengeDescription: string;
  hint: string;
  status: 'upcoming' | 'ongoing' | 'finished';
  createdBy: string;
};
