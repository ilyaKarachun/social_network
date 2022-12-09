import {addPostAC, profileReducer, profileReducerT} from "./profile-reducer";

    test("new post should be added", () => {
        //test data
        let action = addPostAC("new Post")

        const initialState = {
            profile: null,
            posts: [
                {id: 1, message: "Winter is coming"},
                {id: 2, message: "I lost my motivation"},
            ],
            newPostText: "",
            status: ""
        }

        //action
        let newState = profileReducer(initialState, action)

        //expect
        expect(newState.posts.length).toBe(3)
    })
