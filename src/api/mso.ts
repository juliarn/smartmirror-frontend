import createRequest from './index';

export interface CoverLesson {
  date: string;
  period: number;
  coveredTeacher: string;
  teacher: string | null;
  comment: string;
  course: string;
  subject: string;
}

export interface CoverLessons {
  coverLessons: CoverLesson[];
}

export async function getCoverLessons(): Promise<CoverLessons> {
  const response = await createRequest('services/mso/state');
  return await response.json();
}
