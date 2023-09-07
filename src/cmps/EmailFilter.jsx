import React, { useEffect, useState } from 'react'

const translateNullableBool = {
    true: true,
    false: false,
    null: null,
}

export function EmailFilter({ filter, onSetFilter }) {
    const [filterDraft, setFilterDraft] = useState(filter)

    useEffect(() => {
        onSetFilter(filterDraft)
    }, [filterDraft])

    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        if (type === 'number') {
            value = +value
        } else if (['isRead', 'isStarred'].includes(field)) {
            value = translateNullableBool[value]
            console.log(value)
        }
        setFilterDraft((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
    }

    return (
        <form className="email-filter" onSubmit={onSubmitFilter}>
            {/* Read */}
            <label htmlFor="isRead">Read:</label>
            <select
                name="isRead"
                id="isRead"
                onChange={handleChange}
                value={'' + filterDraft.isRead}
            >
                <option value="true">Read</option>
                <option value="false">Unread</option>
                <option value="null">All</option>
            </select>

            {/* Starred */}
            <label htmlFor="isStarred">Starred:</label>
            <select
                name="isStarred"
                id="isStarred"
                onChange={handleChange}
                value={'' + filterDraft.isStarred}
            >
                <option value="true">Starred</option>
                <option value="false">Unstarred</option>
                <option value="null">All</option>
            </select>
        </form>
    )
}
