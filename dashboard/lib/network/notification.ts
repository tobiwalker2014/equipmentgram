import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig/init";

export const NotificationCollection = "notifications";


export interface Notification {
    message: string;
    icon: string;
    click_action: string;
    type: NotificationType;
    from: string;
    to: string;
}

export enum NotificationType {
    Report = "report",
    Message = "message",
    Inspection = "inspection",
    InspectionResponse = "inspection-response",
}

export const useAddNewNotification = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async (notification: Notification): Promise<void> => {
            await addDoc(collection(db, NotificationCollection), notification);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([NotificationCollection]);
                queryClient.refetchQueries([NotificationCollection]);
            },
        }
    );
}



export const useGetNotification = (email: string) => {
    return useQuery<Notification[], Error>([NotificationCollection, email], async () => {
        const q = query(
            collection(db, NotificationCollection),
            where("to", "==", email),
        );

        const querySnapshot = await getDocs(q);
        const sentReports: Notification[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const notification = {
                ...data,
            } as Notification;

            sentReports.push(notification);
        });

        return sentReports;
    });

}