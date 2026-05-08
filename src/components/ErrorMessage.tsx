interface Props {
    message: string;
}

function ErrorMessage({ message }: Props) {
    return (
        <div className="text-center  py-20  text-red-500">
            <p className="text-xl  font-semibold">Something went wrong</p>
            <p className="text-sm  mt-2">{message}</p>
        </div>
    );
}
export default ErrorMessage;