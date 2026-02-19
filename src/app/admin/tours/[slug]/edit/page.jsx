
import EditTourClient from './EditTourClient';

export default async function EditTourPage(props) {
  const params = await props.params;
  const { slug } = params;
  
  return <EditTourClient slug={slug} />;
}
