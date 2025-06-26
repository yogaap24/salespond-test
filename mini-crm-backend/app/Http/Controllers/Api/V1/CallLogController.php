<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\CallLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CallLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $logs = CallLog::with('contact:id,name')
            ->when($request->filled('start_date') && $request->filled('end_date'), function ($query) use ($request) {
                $startDate = $request->start_date . ' 00:00:00';
                $endDate = $request->end_date . ' 23:59:59';
                return $query->whereBetween('timestamp', [$startDate, $endDate]);
            })
            ->orderBy('timestamp', 'desc')
            ->get();

        return response()->json($logs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'contact_id' => 'required|exists:contacts,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $callLog = CallLog::create([
            'contact_id' => $request->input('contact_id'),
            'timestamp' => now(),
            'duration' => rand(15, 300),
            'status' => ['Completed', 'Missed'][array_rand(['Completed', 'Missed'])],
        ]);

        return response()->json($callLog, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
