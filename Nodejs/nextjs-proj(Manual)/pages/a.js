import { withRouter } from "next/router";
import Comp from "../component/comp";

const Show = ({ router }) => <Comp>query: {router.query.id} </Comp>;
export default withRouter(Show);
