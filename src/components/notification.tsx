type NotificationProps = {
    mensagem: string,
    type: string,
}

export const Notification = ({ mensagem, type }: NotificationProps) => {

    return (
        <div className={type === 'error' ? "bg-red-600 text-white" : "bg-green-600 text-white"}>
            { mensagem }
        </div>
    )
};