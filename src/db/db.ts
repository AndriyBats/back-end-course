export type CourseType = {
    id: number,
    title: string,
    studentsCount: number,
}

export const db: {courses: CourseType[]} = {
    courses: [
      {id: 1, title: 'front-end', studentsCount: 10},
      {id: 2, title: 'back-end', studentsCount: 8},
      {id: 3, title: 'automation qa', studentsCount: 2},
      {id: 4, title: 'devops', studentsCount: 5},
    ],
}
