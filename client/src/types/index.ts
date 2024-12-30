import { StaticImageData } from "next/image";

export type TimelineItemType = {
  id: number;
  title: string;
  description: string;
  time: string;
};

export type SatrtUpCardDataType = {
  id: number;
  title: string;
  description: string;
  imgSrc: StaticImageData;
  link: string;
};

export type RegisterIdeaType = {
  fatherName: string;
  country?: string;
  state?: string;
  city: string;
  career: string;
  maritalStatus?: string;
  gender: string;
  mobileNumber: string;
  age: number;
  branchOfStudy: string;
  branchDetail?: string;
  ideaTitle: string;
  ideaDescription: string;
};

export type UserIdeaType = {
  id: string;
  ownerId: string;
  reportId?: string;
  fatherName: string;
  country?: string;
  state?: string;
  city: string;
  career: string;
  maritalStatus?: string;
  gender: string;
  mobileNumber: string;
  age: number;
  branchOfStudy: string;
  branchDetail?: string;
  ideaTitle: string;
  ideaDescription: string;
  createdAt?: Date;
};

export interface Report {
  id?: string;
  ideaTitle: string;
  ideaId: string;
  ownerId: string;
  stages: {
    _id?: string;
    stageTitle: string;
    status: "Completed" | "In Progress" | "Not Started";
    tasks: {
      _id?: string;
      taskTitle: string;
      completed: boolean;
    }[];
  }[];
  createdAt?: Date;
}
