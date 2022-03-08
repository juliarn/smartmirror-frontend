import React, {useEffect, useState} from 'react';
import Widget, {WidgetProps} from '../Widget';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {CoverLesson} from '../../../api/mso';
import {requestCoverLessons} from '../../../store/msoSlice';

const CoverLessonsWidget = ({
  widget,
  position,
  getAreaElement,
  edit,
}: WidgetProps) => {
  const [coverLessonsToday, setCoverLessonsToday] = useState<CoverLesson[]>([]);
  const [coverLessonsTomorrow, setCoverLessonsTomorrow] = useState<
    CoverLesson[]
  >([]);

  const {coverLessons} = useSelector((root: RootState) => root.mso);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestCoverLessons());

    const intervalId = setInterval(
      () => dispatch(requestCoverLessons()),
      1000 * 60 * 60
    );
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const now = new Date();

    if (coverLessons) {
      const periodSorter = (a: CoverLesson, b: CoverLesson) => {
        if (a.period < b.period) {
          return -1;
        }
        if (a.period > b.period) {
          return 1;
        }
        return 0;
      };

      const filterCoverLessons = (day: number) => {
        return coverLessons
          .filter(coverLesson => new Date(coverLesson.date).getDay() === day)
          .sort(periodSorter);
      };

      setCoverLessonsToday(filterCoverLessons(now.getDay()));
      setCoverLessonsTomorrow(filterCoverLessons(now.getDay() + 1));
    } else if (edit) {
      const coverLesson = {
        date: now.toISOString(),
        coveredTeacher: 'M. Mustermann',
        teacher: null,
        comment: 'free',
        course: '',
        subject: 'Maths',
      };

      setCoverLessonsToday([
        {period: 1, ...coverLesson},
        {period: 2, ...coverLesson},
        {period: 3, ...coverLesson},
      ]);
    }
  }, [coverLessons]);

  const right = position.area.endsWith('RIGHT');
  const language = window.navigator.language;

  return (
    <Widget
      widget={widget}
      position={position}
      getAreaElement={getAreaElement}
      edit={edit}
    >
      <div className={`text-white ${right ? 'text-right' : ''}`}>
        {[coverLessonsToday, coverLessonsTomorrow]
          .filter(dayCoverLessons => dayCoverLessons.length > 0)
          .map(dayCoverLessons => (
            <div key={dayCoverLessons[0].date}>
              <h1 className="text-3xl font-bold">
                {new Date(dayCoverLessons[0].date).toLocaleDateString(
                  language,
                  {
                    month: 'long',
                    day: 'numeric',
                  }
                )}
              </h1>
              <div className={`${right ? 'pr-5' : 'pl-5'} flex`}>
                <div className="pr-2">
                  {dayCoverLessons.map(coverLesson => (
                    <p className="text-xl font-bold">{coverLesson.period}. </p>
                  ))}
                </div>
                <div>
                  {dayCoverLessons.map(coverLesson => (
                    <p className="text-xl">
                      {`${coverLesson.subject}, ${coverLesson.comment} (${
                        coverLesson.coveredTeacher
                      } - ${coverLesson.teacher ?? '/'})`}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </Widget>
  );
};

export default CoverLessonsWidget;
