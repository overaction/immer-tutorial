import React, {useRef, useCallback, useState} from 'react';
import produce from 'immer';

// immer에서 제공하는 produce 함수를 호출할 때, 첫 번째 파라미터가 함수 형태라면 업데이트 함수를 반환한다.
const App = () => {
    const nextId = useRef(1);
    const [form, setForm] = useState({name : '', username : ''});
    const [data, setData] = useState({
        array: [],
        uselessValue: null
    });

    const onChange = useCallback(
        e => {
            const {name,value} = e.target;
            setForm(
                produce(draft => {
                    draft[name] = [value];
                })
            )
        },
        []
    );

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            const info = {
                id: nextId.current,
                name: form.name,
                username: form.username
            };

            setData(
                produce(draft => {
                    draft.array.push(info);
                })
            );

            setForm({
                name: '',
                username: ''
            });
            nextId.current += 1;
        },
        [form.name, form.username]
    );

    const onRemove = useCallback(
        id => {
            setData(
                produce(draft => {
                    draft.array.splice(draft.array.findIndex(info => info.id === id),1) // 뒤에 숫자 1은 deletecounter 로써, 삭제할 요소 개수를 뜻함
                })
            )
        },
        []
    );

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="username"
                    placeholder="아이디"
                    value={form.username}
                    onChange={onChange}
                />
                <input
                    name="name"
                    placeholder="이름"
                    value={form.name}
                    onChange={onChange}
                />
                <button type="submit">등록</button>
            </form>
            <div>
                <ul>
                    {data.array.map(info => (
                        <li key={info.id} onClick={() => onRemove(info.id)}>
                            {info.username} {info.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default App;