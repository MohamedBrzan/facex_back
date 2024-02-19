import User from '../User/User';
import Timing from '../../enums/Timing';
import Skill from '../Skill/Skill';

enum apply {
  easy = 'easy',
  apply = 'apply',
}

type Process = {
  user: User;
  resume: string;
};

interface Job {
  user: User;
  title: string;
  type: {
    apply: apply;
    position: string;
    timing: Timing;
  };
  company: {
    name: string;
    address: string;
    employees?: {
      count: {
        from: number;
        to: number;
      };
    };
    applicants?: number;
  };
  skills: string[];
  about: {
    bio: string;
    duties: string;
    requirements: string;
    skills: {
      technical: Skill[];
      interpersonal: Skill[];
    };
  };
  process?: {
    applied: Process[];
    reviewing: Process[];
    interviewing: Process[];
    rejected: Process[];
    approved: Process[];
  };
  employees?: Process[];
}

export default Job;
