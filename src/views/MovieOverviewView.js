import Section from '../Components/Section';
import MovieDetail from '../Components/MovieDetails';
import AdditionalInformation from '../Components/AdditionalInformation';

export default function MovieOverview() {
  return (
    <Section>
      <MovieDetail />
      <AdditionalInformation />
    </Section>
  );
}
