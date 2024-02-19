import User from "../../Interfaces/User/User";

type Expressions = {
  like?: User[];
  love?: User[];
  support?: User[];
  sad?: User[];
  happy?: User[];
  angry?: User[];
  disgust?: User[];
  surprise?: User[];
  fear?: User[];
};

export default Expressions;
