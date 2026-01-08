import {compose} from '../fp';
import {arrayJoin, arrayMap} from './util';

const joinSentences = arrayJoin(' ')<string>;
const joinSections = arrayJoin('\n')<string>;
const makeArticle = compose(joinSections, arrayMap(joinSentences));

const text1 = ['Hello world!', 'Nice clouds.'];
const text2 = ['Bye world!', 'Stay green.'];

describe(`example arrayJoin`, () => {
  it(`joins`, () => expect(makeArticle([text1, text2])).toBe(`Hello world! Nice clouds.\nBye world! Stay green.`));
});
