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
    getList: useCallback<() => Promise<AccountBookHistory[]>>(async () => {
      const db = await openDB();
      const result = await db.executeSql('SELECT * FROM account_history');
      const items: AccountBookHistory[] = [];
      const size = result[0].rows.length;

      for (let i = 0; i < size; i++) {
        const item = result[0].rows.item(i);

        items.push({
          type: item.type,
          comment: item.comment,
          createdAt: parseInt(item.createdAt),
          updatedAt: parseInt(item.updatedAt),
          date: parseInt(item.date),
          id: parseInt(item.id),
          photoUrl: item.photoUrl,
          price: parseInt(item.price),
        });
      }

      return items.sort((a, b) => a.date - b.date);
    }, [openDB]),

    updateItem: useCallback<
      (item: AccountBookHistory) => Promise<AccountBookHistory>
    >(item => {}, []),
  };
}
