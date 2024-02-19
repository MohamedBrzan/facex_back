import { Schema, model, Types } from 'mongoose';
import Job from '../../Interfaces/Job/Job';
import Experience from '../../enums/Experience';
import Timing from '../../enums/Timing';

const jobSchema = new Schema<Job>(
  {
    user: { type: Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    type: {
      apply: { type: String, enum: ['easy', 'apply'] },
      position: { type: String, required: true },
      timing: { type: String, enum: Timing, required: true },
    },
    company: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      employees: {
        count: {
          from: { type: Number, required: true },
          to: { type: Number, required: true },
        },
      },
      applicants: { type: Number, required: true },
    },
    skills: [{ type: String, required: true }],
    about: {
      bio: { type: String, required: true },
      duties: { type: String, required: true },
      requirements: { type: String, required: true },
      skills: {
        technical: [
          {
            name: { type: String, required: true },
            experience: { type: String, enum: Experience },
          },
        ],
        interpersonal: [
          {
            name: { type: String, required: true },
            experience: { type: String, enum: Experience },
          },
        ],
      },
    },
    process: {
      applied: [
        {
          user: { type: Types.ObjectId, ref: 'User' },
          resume: { type: String, required: true },
        },
      ],
      reviewing: [
        {
          user: { type: Types.ObjectId, ref: 'User' },
          resume: { type: String, required: true },
        },
      ],
      interviewing: [
        {
          user: { type: Types.ObjectId, ref: 'User' },
          resume: { type: String, required: true },
        },
      ],
      rejected: [
        {
          user: { type: Types.ObjectId, ref: 'User' },
          resume: { type: String, required: true },
        },
      ],
      approved: [
        {
          user: { type: Types.ObjectId, ref: 'User' },
          resume: { type: String, required: true },
        },
      ],
    },
    employees: [
      {
        user: { type: Types.ObjectId, ref: 'User' },
        resume: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default model('Job', jobSchema);
