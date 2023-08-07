import {useCallback} from 'react';
import {AccountBookHistory} from '../type/AccountBookHistory';
import {
  SQLiteDatabase,
  enablePromise,
  openDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

export default function useAccountBookHistory() {
  const openDB = useCallback<() => Promise<SQLiteDatabase>>(async () => {
    return await openDatabase(
      {
        name: 'account_history',
        createFromLocation: '~www/account_history.db',
        location: 'default',
      },
      () => {
        console.log('DB Open Success');
      },
      () => {
        console.log('DB Open Failure');
      },
    );
  }, []);

  return {
    insertItem: useCallback<
      (item: Omit<AccountBookHistory, 'id'>) => Promise<AccountBookHistory>
    >(
      async item => {
        const db = await openDB();
        const now = new Date().getTime();

        const result = await db.executeSql(
          `
                INSERT INTO account_history (type, price, comment, date, photoUrl, createdAt, updatedAt)
                VALUES ( 
                    "${item.type}",
                    ${item.price},
                    "${item.comment}",
                    ${item.date},
                    ${item.photoUrl !== null ? `"${item.photoUrl}"` : null},
                    ${now},
                    ${now}
                )
            `,
        );

        console.log(result);

        return {
          ...item,
          id: result[0].insertId,
        };
      },
      [openDB],
    ),

    updateItem: useCallback<
      (item: AccountBookHistory) => Promise<AccountBookHistory>
    >(item => {}, []),
  };
}
